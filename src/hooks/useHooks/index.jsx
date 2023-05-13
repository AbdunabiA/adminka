import { useLocation, useNavigate } from "react-router-dom"
import qs from 'qs'
import { useSelector } from "react-redux"
import { systemSelectors } from "store/system"

const useHooks = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const params = qs.stringify(location.search, {ignoreQueryPrefix: true})
  return {
    navigate,
    location,
    params,
    qs,
  }
}

export default useHooks