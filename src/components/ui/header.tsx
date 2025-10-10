import { ArrowUpRight } from "lucide-react";
import { Button } from "./button";

function Header() {
  return (
    <header className="border-b bg-black/5 w-full border-x px-3 flex items-center justify-between space-x-4">
      <div className="border-x w-full py-2 px-4 flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-2">
          <img
            src="https://www.guialves.site/guialves.png"
            alt="Logo"
            className="h-5 invert dark:invert-0"
          />
        </div>

        <div className="flex items-center space-x-4">
          <a href="https://github.com/guialveess" target="_blank">
            <ArrowUpRight className="w-3 h-3" />
          </a>

          <Button
            variant="outline"
            className="bg-transparent rounded-full !px-5 uppercase font-mono h-6"
            asChild
          >
            <a href="https://www.guialves.site/" target="_blank">
              <span className="opacity-60 text-[10px]">Open Portfolio</span>
              <ArrowUpRight className="w-3 h-3 ml-1" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}

export { Header };
