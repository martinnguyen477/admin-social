
interface PropsChild {
    isLoading?: boolean
    // any props that come into the component
  }
export const Loading = ({ isLoading} : PropsChild) => {
    return isLoading ? <span className='spinner-border spinner-border-sm mr-1'></span> : <span></span>;
}
