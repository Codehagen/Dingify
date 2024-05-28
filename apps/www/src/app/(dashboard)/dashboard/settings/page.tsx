import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { AddApiKeyButton } from "@/components/buttons/AddApiKeyButton";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { LanguageForm2 } from "@/components/forms/language-form2";
import { UserNameForm } from "@/components/forms/user-name-form";

export const metadata = {
  title: "Dingify Settings - Customize Your Experience",
  description:
    "Adjust your Dingify account settings for a personalized real-time monitoring experience. Manage language preferences, account details, and more.",
};

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions.pages?.signIn || "/login");
  }

  const handleUpdateUser = async (data) => {
    // ... logic to update the user
  };

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <AddApiKeyButton />
      <div className="grid gap-10">
        <UserNameForm user={{ id: user.id, name: user.name || "" }} />
      </div>
    </DashboardShell>
  );
}
