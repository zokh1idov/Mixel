import { NavMenu } from "./NavMenu";
import { MainHeader } from "./MainHeader";
import { Topbar } from "./TopBar";

export function Navbar({filterData}) {
  return (
    <>
      <Topbar />
      <MainHeader filterData={filterData} />
      <NavMenu />
    </>
  );
}
