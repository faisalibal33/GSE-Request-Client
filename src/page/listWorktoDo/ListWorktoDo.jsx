import "./listworktodo.scss"
import Sidebar from "../../component/sidebar/Sidebar"
import DashboardNavbar from "../../component/dashboardNavbar/DashboardNavbar"
import Worktodo from "../../component/worktodo/Worktodo"

const ListWorktoDo = () => {
  return (
    <div className="listWorktoDo">
      <Sidebar/>
      <div className="listWorktoDoContainer">
        <DashboardNavbar/>
        <Worktodo/>
      </div>
    </div>
  )
}

export default ListWorktoDo