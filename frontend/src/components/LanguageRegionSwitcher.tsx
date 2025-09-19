import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, ChevronDown } from "lucide-react";

const languages = [
  { code: "en", name: "English", region: "India" },
  { code: "hi", name: "हिंदी", region: "भारत" },
  { code: "ta", name: "தமிழ்", region: "இந்தியா" },
  { code: "gu", name: "ગુજરાતી", region: "ભારત" },
  { code: "te", name: "తెలుగు", region: "భారతదేశం" },
  { code: "bn", name: "বাংলা", region: "ভারত" },
  { code: "mr", name: "मराठी", region: "भारत" },
  { code: "kn", name: "ಕನ್ನಡ", region: "ಭಾರತ" },
  { code: "ml", name: "മലയാളം", region: "ഇന്ത്യ" },
  { code: "pa", name: "ਪੰਜਾਬੀ", region: "ਭਾਰਤ" }
];

const LanguageRegionSwitcher = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">{selectedLanguage.name}</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setSelectedLanguage(language)}
            className={`flex items-center justify-between cursor-pointer ${
              selectedLanguage.code === language.code ? "bg-coral/10 text-coral" : ""
            }`}
          >
            <div className="flex flex-col">
              <span className="font-medium">{language.name}</span>
              <span className="text-xs text-muted-foreground">{language.region}</span>
            </div>
            {selectedLanguage.code === language.code && (
              <div className="w-2 h-2 bg-coral rounded-full" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageRegionSwitcher;