import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./styles.module.css";

const Main = () => {
  const [user, setUser] = useState({
    name: "Nardos",
    role: "Trainee",
  });

  const [data, setData] = useState({ publicKey: "" });
  const [ setError] = useState("");
  const [requests, setRequests] = useState([
    {
      _id: "123",
      trainee: "Nardos Tilahun",
      publicKey: "dkjhflqIEYFliwekw",
    },
    {
      _id: "456",
      trainee: "French Kiwi Juice",
      publicKey: "LSJKHFLWIQUEI",
    },
  ]);
  const [certificates, setCertificates] = useState([]);
  const [trainneCertificates, setTraineeCertificates] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const getUser = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/account";
      const token = localStorage.getItem("token");
      const response = await axios({
        method: "GET",
        url,
        data: token,
      });
      setUser(response.data);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const getRequests = async () => {
    try {
      const url = "http://localhost:8080/api/requests";
      const response = await axios({
        method: "GET",
        url,
      });
      setRequests(response.data);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const sendRequest = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/requests";

      await axios({
        method: "POST",
        url,
        data,
      });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const getCertificates = async () => {
    try {
      const url = "http://localhost:8080/api/certificates";
      const response = await axios({
        method: "GET",
        url,
      });
      setCertificates(response.data);
    } catch (error) {}
  };

  const getTraineeCertificate = async (traineePublickKey) => {
    const traineCrtificates = certificates.filter(
      (certificate) => certificate.publicKey === traineePublickKey
    );

    setTraineeCertificates(traineCrtificates);
  };

  const handleApprove = async (traineeID) => {
    try {
      const url = "http://localhost:8080/api/update";
      await axios({
        method: "GET",
        url,
        body: {
          trainneCertificates: trainneCertificates,
          id: traineeID,
        },
      });
    } catch (error) {}
  };
  const handleDecline = (traineeID) => {};

  // this runs first
  useEffect(() => {
    getUser();
    getCertificates();
    getRequests();
  }, []);

  return (
    <div className={styles.main_container}>
      {user.role === "Staff" ? (
        <>
          <nav className={styles.navbar}>
            <h1>Certificate requesting page</h1>
            <button className={styles.white_btn} onClick={handleLogout}>
              Logout
            </button>
          </nav>
          <div
            style={{
              padding: "30px",
              marginBottom: "30px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ width: "100%" }}>
              <h3 style={{ color: "#3c3c3c" }}>Opt-in Requests List</h3>
            </div>
            <div style={{ width: "90%", marginTop: "20px" }}>
              {requests.map((request) => {
                return (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: " #e7e7e7",
                      padding: "10px",
                      paddingLeft: "15px",
                      paddingRight: "15px",
                      borderRadius: "5px",
                      marginBottom: "20px",
                    }}
                  >
                    <p style={{ fontWeight: 300 }}>{request.trainee}</p>

                    <p
                      onClick={() => getTraineeCertificate(request.publicKey)}
                      style={{
                        fontWeight: 300,
                        color: "green",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      Show certificates
                    </p>
                    <div>
                      <button
                        onClick={() => handleApprove(request._id)}
                        style={{
                          border: "none",
                          outline: "none",
                          padding: "10px",
                          color: "white",
                          borderRadius: "5px",
                          height: "40px",
                          marginRight: "15px",
                          backgroundColor: "green",
                          width: "100px",
                        }}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleDecline(request._id)}
                        style={{
                          border: "none",
                          outline: "none",
                          padding: "10px",
                          color: "white",
                          borderRadius: "5px",
                          height: "40px",
                          backgroundColor: "#f34646",
                          width: "100px",
                        }}
                      >
                        Decline
                      </button>
                    </div>

                    {trainneCertificates.map((cert) => {
                      return <p>{cert}</p>;
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          <nav className={styles.navbar}>
            <h1>Request your certificate</h1>
            <button className={styles.white_btn} onClick={handleLogout}>
              Logout
            </button>
          </nav>
          <div
            style={{
              padding: "30px",
              marginBottom: "30px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2 style={{ color: "#f34646", marginBottom: "30px" }}>
              Welcome to 10X, {user.name}!
            </h2>
            <input
              type="text"
              placeholder="Enter your public key"
              name="publicKey"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            <button
              onClick={sendRequest}
              style={{
                border: "none",
                outline: "none",
                padding: "10px",
                color: "white",
                borderRadius: "5px",
                height: "50px",
                backgroundColor: "#f34646",
                width: "200px",
                fontSize: "15px",
                marginTop: "15px",
              }}
            >
              Request Opt-In
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Main;