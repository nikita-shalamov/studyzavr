"use client";

import ExitAccount from "@/components/ExitAccount/ExitAccount";
import ProfileInfo from "@/components/ProfileInfo/ProfileInfo";

const TeacherProfile = () => {
  return (
    <div>
      <h1 className="pageTitle">Профиль</h1>
      <ProfileInfo />
      <ExitAccount />
    </div>
  );
};

export default TeacherProfile;
