import Notes from "./Notes";
function Home(props) {
  const {showAlert} = props;
  return (
    <>
      <Notes showAlert={showAlert}/>
    </>
  );
}

export default Home;
