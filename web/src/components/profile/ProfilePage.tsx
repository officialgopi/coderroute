import { ProfileSidebar } from "./ProfileSidebar";
import { ProfileTabs } from "./ProfileTabs";

export default function ProfilePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-12 gap-6">
      <aside className="col-span-12 md:col-span-3">
        <ProfileSidebar />
      </aside>

      <main className="col-span-12 md:col-span-9">
        <ProfileTabs />
      </main>
    </div>
  );
}
