"use client";

import { Icon } from "@iconify/react";
import { Tabs, Tab } from "@heroui/react";
import { FC } from "react";

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ProfileTabs: FC<ProfileTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-200">
      <Tabs
        selectedKey={activeTab}
        onSelectionChange={(key) => onTabChange(key as string)}
        color="primary"
        variant="underlined"
        classNames={{
          tabList: "gap-6",
          cursor: "bg-emerald-600",
          tab: "px-0 h-12 data-[selected=true]:text-emerald-600",
        }}
      >
        <Tab
          key="recipes"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="solar:bowl-spoon-bold" className="h-5 w-5" />
              <span>Meine Rezepte</span>
            </div>
          }
        />
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
