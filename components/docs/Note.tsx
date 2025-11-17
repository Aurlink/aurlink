// components/docs/Note.tsx
interface NoteProps {
  type?: 'info' | 'warning' | 'success' | 'error';
  children: React.ReactNode;
}

export function Note({ type = 'info', children }: NoteProps) {
  const styles = {
    info: 'bg-blue-500/10 border-blue-400/20 text-blue-200',
    warning: 'bg-yellow-500/10 border-yellow-400/20 text-yellow-200',
    success: 'bg-green-500/10 border-green-400/20 text-green-200',
    error: 'bg-red-500/10 border-red-400/20 text-red-200'
  };

  return (
    <div className={`p-4 rounded-lg border ${styles[type]} my-6`}>
      {children}
    </div>
  );
}