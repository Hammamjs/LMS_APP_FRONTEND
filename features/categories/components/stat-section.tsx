type Props = {
  categoriesLength: number;
  coursesLength: number;
};

export const Stats = ({ categoriesLength, coursesLength }: Props) => {
  return (
    <section className="border-t border-border/50 bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {categoriesLength}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {coursesLength}+
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              Total Courses
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">Expert</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Instructors
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">24/7</div>
            <div className="mt-1 text-sm text-muted-foreground">Access</div>
          </div>
        </div>
      </div>
    </section>
  );
};
