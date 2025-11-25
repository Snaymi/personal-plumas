// organisms/index.ts
// Re-export dos organisms para importação centralizada

import ContentHome from "./ContentHome.vue";
import Header from "./Header.vue";
import LoginFormOrganism from "./LoginFormOrganism.vue";
import OrganismGridView from "./organismGridView.vue";
import ReleaseContent from "./ReleaseContent.vue";
import SubHeader from "./SubHeader.vue";
import OrganismTopCard from "./OrganismTopCard.vue";
import OrganismDashBoardResume from "./OrganismDashBoardResume.vue";
import LoginImgDesktopOrganism from "./LoginImgDesktopOrganism.vue";
import LoginImgMobileOrganism from "./LoginImgMobileOrganism.vue";
// export named para facilitar import por destructuring
export {
  LoginImgMobileOrganism,
  LoginImgDesktopOrganism,
  OrganismDashBoardResume,
  OrganismTopCard,
  ContentHome,
  Header,
  LoginFormOrganism,
  OrganismGridView,
  ReleaseContent,
  SubHeader,
};
