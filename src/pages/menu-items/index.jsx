import { Table } from "antd"
import { ContainerAll, ContainerOne } from "modules"
import { useParams } from "react-router-dom"


const index = () => {
    const {id} = useParams()
  return (
    <>
      <ContainerOne
        url={`/menu/${id}`}
      >
        {
          ({item})=>{
            return(
              <div>
                <Table/>
              </div>
            )
          }
        }
      </ContainerOne> 
    </>
  )
}

export default index