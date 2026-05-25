type Props = {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
};

export const InstructorStats = ({ icon, label, value }: Props) => {
  return (
    <div>
      <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold">{value}</div>
    </div>
  );
};
