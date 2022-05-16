import { ReactComponent as LoadingIcon } from '../../assets/images/loading.svg'

function Loading({}) {
  return <div className="w-full flex justify-center text-center m-10"><LoadingIcon
    className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" /></div>
}

export default Loading
