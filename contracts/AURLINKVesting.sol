// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract AURLINKVestingPortal is
    Initializable,
    OwnableUpgradeable,
    ReentrancyGuardUpgradeable,
    PausableUpgradeable,
    UUPSUpgradeable
{
    using SafeERC20Upgradeable for IERC20Upgradeable;

    IERC20Upgradeable public aurlinkToken;

    // -------------------- Structures --------------------
    struct VestingPackage {
        uint256 packageId;
        string name;
        uint256 totalAmount;
        uint256 price;          // payment amount in USDC or native token (0 = free)
        uint256 cliff;          // seconds
        uint256 duration;       // seconds
        uint8 category;
        uint256 maxParticipants;
        uint256 currentParticipants;
        bool isActive;
    }

    enum VestingCategory {
        PreSale,
        EcosystemGrants,
        TeamAdvisors,
        StrategicPartners,
        ReserveTreasury
    }

    struct VestingSchedule {
        uint256 packageId;
        uint256 totalAmount;
        uint256 releasedAmount;
        uint256 startTime;
        uint256 cliff;
        uint256 duration;
        VestingCategory category;
        bool initialized;
    }

    // -------------------- Storage --------------------
    mapping(uint256 => VestingPackage) public vestingPackages;
    mapping(address => VestingSchedule) public vestingSchedules;
    mapping(uint256 => address[]) public packageParticipants;

    uint256 public nextPackageId;
    uint256 public totalPackagesCreated;

    address public paymentToken; // ERC20 or address(0) for native

    // -------------------- Events --------------------
    event VestingPackageCreated(uint256 packageId, string name, uint256 totalAmount, uint256 price);
    event VestingPackageSelected(address indexed investor, uint256 packageId, uint256 amount);
    event TokensReleased(address indexed investor, uint256 amount);
    event PackageStatusChanged(uint256 packageId, bool isActive);
    event PaymentTokenUpdated(address newPaymentToken);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    // -------------------- Initializer --------------------
    function initialize(address _tokenAddress, address _paymentToken) public initializer {
        __Ownable_init(msg.sender);
        __ReentrancyGuard_init();
        __Pausable_init();
        __UUPSUpgradeable_init();

        require(_tokenAddress != address(0), "Invalid token address");
        aurlinkToken = IERC20Upgradeable(_tokenAddress);
        paymentToken = _paymentToken;
        nextPackageId = 1;

        _initializeDefaultPackages();
    }

    // -------------------- Default Packages --------------------
    function _initializeDefaultPackages() internal {
        _createVestingPackage(
            "Early Supporter",
            100000 * 10**18,
            0,
            30 days,
            365 days,
            uint8(VestingCategory.PreSale),
            1000
        );

        _createVestingPackage(
            "Ecosystem Builder",
            50000 * 10**18,
            0,
            90 days,
            730 days,
            uint8(VestingCategory.EcosystemGrants),
            500
        );

        _createVestingPackage(
            "Strategic Partner",
            200000 * 10**18,
            1000 * 10**18,
            180 days,
            540 days,
            uint8(VestingCategory.StrategicPartners),
            100
        );

        _createVestingPackage(
            "Community Member",
            10000 * 10**18,
            100 * 10**18,
            30 days,
            365 days,
            uint8(VestingCategory.PreSale),
            5000
        );
    }

    // -------------------- Internal Helpers --------------------
    function _createVestingPackage(
        string memory _name,
        uint256 _totalAmount,
        uint256 _price,
        uint256 _cliff,
        uint256 _duration,
        uint8 _category,
        uint256 _maxParticipants
    ) internal {
        vestingPackages[nextPackageId] = VestingPackage({
            packageId: nextPackageId,
            name: _name,
            totalAmount: _totalAmount,
            price: _price,
            cliff: _cliff,
            duration: _duration,
            category: _category,
            maxParticipants: _maxParticipants,
            currentParticipants: 0,
            isActive: true
        });

        emit VestingPackageCreated(nextPackageId, _name, _totalAmount, _price);
        nextPackageId++;
        totalPackagesCreated++;
    }

    // -------------------- Admin Actions --------------------
    function createVestingPackage(
        string memory _name,
        uint256 _totalAmount,
        uint256 _price,
        uint256 _cliff,
        uint256 _duration,
        uint8 _category,
        uint256 _maxParticipants
    ) external onlyOwner {
        _createVestingPackage(_name, _totalAmount, _price, _cliff, _duration, _category, _maxParticipants);
    }

    function setPackageStatus(uint256 _packageId, bool _isActive) external onlyOwner {
        vestingPackages[_packageId].isActive = _isActive;
        emit PackageStatusChanged(_packageId, _isActive);
    }

    function setPaymentToken(address _paymentToken) external onlyOwner {
        paymentToken = _paymentToken;
        emit PaymentTokenUpdated(_paymentToken);
    }

    function withdrawPayments(address _token, uint256 _amount) external onlyOwner {
        if (_token == address(0)) {
            payable(owner()).transfer(_amount);
        } else {
            IERC20Upgradeable(_token).safeTransfer(owner(), _amount);
        }
    }

    // -------------------- User Actions --------------------
    function selectVestingPackage(uint256 _packageId) external payable nonReentrant whenNotPaused {
        require(!vestingSchedules[msg.sender].initialized, "Already have vesting");
        VestingPackage storage package = vestingPackages[_packageId];
        require(package.isActive, "Inactive package");
        require(package.currentParticipants < package.maxParticipants, "Full");
        require(package.totalAmount > 0, "Invalid package");

        if (package.price > 0) {
            if (paymentToken == address(0)) {
                require(msg.value >= package.price, "Insufficient payment");
                if (msg.value > package.price) payable(msg.sender).transfer(msg.value - package.price);
            } else {
                IERC20Upgradeable(paymentToken).safeTransferFrom(msg.sender, address(this), package.price);
            }
        }

        require(aurlinkToken.balanceOf(address(this)) >= package.totalAmount, "Not enough tokens");

        vestingSchedules[msg.sender] = VestingSchedule({
            packageId: _packageId,
            totalAmount: package.totalAmount,
            releasedAmount: 0,
            startTime: block.timestamp,
            cliff: package.cliff,
            duration: package.duration,
            category: VestingCategory(package.category),
            initialized: true
        });

        packageParticipants[_packageId].push(msg.sender);
        package.currentParticipants++;

        emit VestingPackageSelected(msg.sender, _packageId, package.totalAmount);
    }

    function releaseTokens() external nonReentrant whenNotPaused {
        VestingSchedule storage schedule = vestingSchedules[msg.sender];
        require(schedule.initialized, "No vesting");

        uint256 releasable = calculateReleasableAmount(msg.sender);
        require(releasable > 0, "Nothing to release");

        schedule.releasedAmount += releasable;
        aurlinkToken.safeTransfer(msg.sender, releasable);

        emit TokensReleased(msg.sender, releasable);
    }

    // -------------------- View Functions --------------------
    function calculateReleasableAmount(address _investor) public view returns (uint256) {
        VestingSchedule memory s = vestingSchedules[_investor];
        if (!s.initialized) return 0;
        if (block.timestamp < s.startTime + s.cliff) return 0;

        uint256 elapsed = block.timestamp - (s.startTime + s.cliff);
        if (elapsed > s.duration - s.cliff) elapsed = s.duration - s.cliff;

        uint256 vested = (s.totalAmount * elapsed) / (s.duration - s.cliff);
        return vested - s.releasedAmount;
    }

    function getPackageInfo(uint256 id)
        external
        view
        returns (
            string memory name,
            uint256 totalAmount,
            uint256 price,
            uint256 cliff,
            uint256 duration,
            uint8 category,
            uint256 maxParticipants,
            uint256 currentParticipants,
            bool isActive
        )
    {
        VestingPackage memory p = vestingPackages[id];
        return (
            p.name,
            p.totalAmount,
            p.price,
            p.cliff,
            p.duration,
            p.category,
            p.maxParticipants,
            p.currentParticipants,
            p.isActive
        );
    }

    function getActivePackages() external view returns (VestingPackage[] memory) {
        VestingPackage[] memory temp = new VestingPackage[](totalPackagesCreated);
        uint256 count;
        for (uint256 i = 1; i < nextPackageId; i++) {
            if (vestingPackages[i].isActive) {
                temp[count] = vestingPackages[i];
                count++;
            }
        }
        assembly {
            mstore(temp, count)
        }
        return temp;
    }

    function getVestingInfo(address investor)
        external
        view
        returns (
            uint256 packageId,
            uint256 totalAmount,
            uint256 released,
            uint256 locked,
            uint256 releasable,
            uint256 start,
            uint256 cliffEnd,
            uint256 end,
            uint8 category
        )
    {
        VestingSchedule memory s = vestingSchedules[investor];
        if (!s.initialized) return (0,0,0,0,0,0,0,0,0);
        uint256 r = calculateReleasableAmount(investor);
        uint256 lockedAmt = s.totalAmount - s.releasedAmount - r;
        return (
            s.packageId,
            s.totalAmount,
            s.releasedAmount,
            lockedAmt,
            r,
            s.startTime,
            s.startTime + s.cliff,
            s.startTime + s.duration,
            uint8(s.category)
        );
    }

    // -------------------- UUPS Auth --------------------
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}
