import Whiteboard from "@/components/whiteboard/Whiteboard"

type  Props = {
    params: Promise<{
        boardId : string; 
    }>
}; 

export default async function BoardPage({ params } : Props){
    const {boardId}  = await params; 
    return <Whiteboard boardId={boardId} />
}