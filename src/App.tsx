import SinglePageApp from "./components/SinglePageApp";
import Clicking from "./components/Clicking";

const App = () => {
  return (
    <div style={{padding: "1em"}}>
      {/* <Clicking /> */}
      <p>This is your usual HTML / JScript / JS framework etc... </p>
      <br/>
      { /* @ts-expect-error */ }
      <script type="py" config="./pyconf.json" src="./demo.py"></script>
      {/* <script type="py" config="./pyconf.json" src="./Camera-vision.py"></script> */}
    </div>
  )
}

/* <SinglePageApp /> */
export default App;