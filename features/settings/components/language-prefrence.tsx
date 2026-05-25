import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';

type Props = {
  language: string;
  handleLanguage: (value: string) => void;
};

export const LanguagePrefrence = ({ handleLanguage, language }: Props) => {
  return (
    <>
      <Label htmlFor="language">Language</Label>
      <Select value={language} onValueChange={handleLanguage}>
        <SelectTrigger id="language" className="w-full sm:w-64">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="es">Espa&ntilde;ol</SelectItem>
          <SelectItem value="fr">Fran&ccedil;ais</SelectItem>
          <SelectItem value="de">Deutsch</SelectItem>
          <SelectItem value="pt">Portugu&ecirc;s</SelectItem>
          <SelectItem value="ja">&#26085;&#26412;&#35486;</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};
