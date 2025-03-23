"use client";
import { Home, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import SheetItem from "../ui/sheet-item";

const MenuSheet: React.FC = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Menu</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>Select the appropriate section.</SheetDescription>
            <div className="flex flex-col">
              <SheetItem url="/" Icon={Home} name="Home" />
              <SheetItem url="/analytics" Icon={Search} name="Analytics" />
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MenuSheet;
