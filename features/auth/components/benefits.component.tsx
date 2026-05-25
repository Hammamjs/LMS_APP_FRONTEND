import { CheckCircle } from 'lucide-react';

const benefits = [
  'Access to 15,000+ courses',
  'Learn from industry experts',
  'Earn certificates',
  'Learn at your own pace',
];
const Benefits = () => {
  return benefits.map((benefit) => (
    <div key={benefit} className="flex items-center gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <CheckCircle className="h-5 w-5 text-primary" />
      </div>
      <span className="text-foreground">{benefit}</span>
    </div>
  ));
};

export default Benefits;
