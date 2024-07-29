import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NotesState from "./context/notes/NotesState";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
     
    <>
      {/* All state variable present in the NoteState will present in all childrens and their childrens and so on */}
      <NotesState>
          <Router>
            <Navbar />
            <div className="container">
              <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/signup" element={<Signup/>} />
                <Route exact path="/reset" element={<ResetPassword/>} />
              </Routes>
            </div>
            <Footer />
          </Router>
      </NotesState>
    </>
  );
}

export default App;
