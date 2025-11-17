-- Blog posts table
CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL DEFAULT 'Aurlink Team',
    featured BOOLEAN DEFAULT FALSE,
    read_time VARCHAR(50) NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog categories table
CREATE TABLE blog_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO blog_categories (name, slug, description) VALUES
('Technology', 'technology', 'Technical deep dives and protocol updates'),
('Tokenomics', 'tokenomics', 'Economic models and token utility'),
('Business', 'business', 'Partnerships and commercial updates'),
('Development', 'development', 'Developer tools and SDK updates'),
('Research', 'research', 'AI and blockchain research papers'),
('Community', 'community', 'Community updates and events');

-- Resources table
CREATE TABLE blog_resources (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    file_url VARCHAR(500),
    file_type VARCHAR(50) NOT NULL,
    file_size VARCHAR(50),
    download_count INTEGER DEFAULT 0,
    icon_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);