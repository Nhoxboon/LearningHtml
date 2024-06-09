import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';
import Nav from "./components/Nav";
import TitleAndButton from "./components/TitleAndButton";
import Page from "./components/Page";
import { useEffect } from "react";



function App() {

  useEffect(() => {
    const handleModalHidden = () => {
      const backdrops = document.querySelectorAll('.modal-backdrop');
      backdrops.forEach(backdrop => backdrop.parentNode.removeChild(backdrop));
    };

    const modal = document.getElementById('addStudentModal');
    modal.addEventListener('hidden.bs.modal', handleModalHidden);

    return () => {
      modal.removeEventListener('hidden.bs.modal', handleModalHidden);
    };
  }, []);

  return (
    <>
      <Nav />
      <TitleAndButton />
      <Page />
    </>
  );
}

export default App;
