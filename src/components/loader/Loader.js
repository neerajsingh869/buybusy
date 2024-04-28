import { DotLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
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