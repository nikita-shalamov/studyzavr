"use client";

import ExitAccount from "@/components/exitAccount/ExitAccount";
import ProfileInfo from "@/components/profileInfo/ProfileInfo";

const StudentProfile = () => {
  return (
    <div>
      <h1 className="pageTitle">Профиль</h1>
      <ProfileInfo />
      <ExitAccount />
    </div>
  );
};

export default StudentProfile;
