import { KanbanContainer } from "../containers/kanban.container"
import { MainLayout } from "../layout/main.layout"

export const KanbanPage = () => {
    return (
        <MainLayout>
            <KanbanContainer />
        </MainLayout>
    )
}