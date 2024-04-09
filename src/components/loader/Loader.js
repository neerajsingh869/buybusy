import { DotLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="pageLoader">
      <DotLoader
        color="#7064e5"
        size={70}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default Loader;