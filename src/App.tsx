import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import TypedContent from "./TypedContent";
import StreakCounter from "./StreakCounter";
import PrognosticButton from "./PrognosticButton";
import Fireworks from "./Fireworks";
import "./index.css";
import LoadingCircle from "./LoadingCircle.tsx";
import Footer from "./Footer.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const [booking_button_name, setBookingButtonName] = useState<string>("");
  const [booking_button_redirection, setBookingButtonRedirection] =
    useState<string>("");
  const [streak, setStreak] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isContentVisible, setIsContentVisible] = useState<boolean>(false); // Control content visibility after loading
  const [isFooterVisible, setIsFooterVisible] = useState<boolean>(false); // Control footer visibility
  const pollingIntervalId = useRef<number | null>(null);
  const fetching = useRef<boolean>(false);
  const timeoutId = useRef<number | null>(null);

  useEffect(() => {
    startPolling();
    return () => {
      stopPolling();
    };
  }, []);

  const startPolling = () => {
    setLoading(true);
    timeoutId.current = window.setTimeout(() => {
      stopPolling();
      setError(
        "We couldn't process your request. Please try again, or contact support@clients.ai."
      );
      setLoading(false);
    }, 95000);

    pollingIntervalId.current = window.setInterval(() => {
      fetchContent();
    }, 2500);
  };

  const stopPolling = () => {
    if (pollingIntervalId.current !== null) {
      clearInterval(pollingIntervalId.current);
    }
    if (timeoutId.current !== null) {
      clearTimeout(timeoutId.current);
    }
  };

  const fetchContent = async (): Promise<string | null> => {
    if (fetching.current) return null;

    fetching.current = true;

    try {
      const API_BASE =
        window.location.hostname !== "localhost"
          ? "http://127.0.0.1:5001"
          : "https://prognostic-ai-backend-acab284a2f57.herokuapp.com";

      const params = new URLSearchParams(window.location.search);
      const user_email = params.get("user_email");
      if (!user_email) {
        setError(
          "It seems like you're trying to retrieve your previous results. Please restart the process to generate new results. If you need assistance, feel free to contact our support team."
        );
        setLoading(false);
        return null;
      }

      const requestBody = {
        user_email: user_email,
      };

      const response = await fetch(`${API_BASE}/get_user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        if (response.status === 403) {
          console.error("CORS issue detected");
          throw new Error(`CORS error! status: ${response.status}`);
        } else if (response.status === 404) {
          return null;
        } else if (response.status >= 500) {
          throw new Error(`Server error! status: ${response.status}`);
        }
      }

      const data = await response.json();

      if (data?.text) {
        setContent(data.text);
        setBookingButtonName(data.booking_button_name);
        setBookingButtonRedirection(data.booking_button_redirection);
        setStreak((prevStreak) => prevStreak + 1);
        stopPolling();
        setLoading(false);

        // Delay the content visibility for smooth transition
        setTimeout(() => {
          setIsContentVisible(true);

          // Delay footer visibility for 5 seconds after content is fully loaded
          setTimeout(() => {
            setIsFooterVisible(true);
          }, 7000); // Footer appears after 5 seconds
        }, 100);

        return data.text;
      } else {
        console.warn("No text content found in the response");
        return null;
      }
    } catch (error) {
      console.error("Error fetching content:", error);
      setContent("Error fetching AI response. Please try again later.");
      setLoading(false);
      stopPolling();
      return null;
    } finally {
      fetching.current = false;
    }
  };

  return (
    <div
      id="wrapper"
      className="container-fluid d-flex flex-column"
      style={{ minHeight: "100vh" }}
    >
      <div id="main" className="row justify-content-center flex-grow-1">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="inner">
            <div
              id="container6"
              className="style1 container default flex-grow-1"
            >
              <div className="wrapper">
                <div className="inner">
                  <Header />
                  <hr id="divider02" className="hr-custom" />
                  {loading ? (
                    <>
                      <LoadingCircle />
                      <p id="text07" className="style1">
                        All rights reserved
                      </p>
                    </>
                  ) : (
                    <>
                      <h1
                        id="text02"
                        className={`text-center fade-in ${
                          isContentVisible ? "visible" : ""
                        }`}
                      >
                        <span className="p">
                          Try Clients.<mark>ai</mark>{" "}
                          <strong>For Your Company</strong>
                          <br />
                          <a
                            href="https://clients.ai/#demo"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Book Your Free Demo Today!
                          </a>
                        </span>
                      </h1>
                      <hr
                        id="divider01"
                        className={`hr-custom fade-in ${
                          isContentVisible ? "visible" : ""
                        }`}
                      />
                      <div
                        id="embed01"
                        className={`fade-in ${
                          isContentVisible ? "visible" : ""
                        }`}
                      >
                        <div className="container">
                          {/* <div className="row justify-content-center">
                            <div className="col-12">
                              <div className="result-header text-center">
                                <h1>Your Clients.ai Solution</h1>
                              </div>
                            </div>
                          </div> */}
                          <div className="row">
                            <div className="col-12">
                              {error ? (
                                <p className="content-box text-center">
                                  {error}
                                </p>
                              ) : (
                                <TypedContent
                                  content={content}
                                  booking_button_name={
                                    booking_button_name ||
                                    "Book Your Free Demo Now!"
                                  }
                                  booking_button_redirection={
                                    booking_button_redirection ||
                                    "https://Clients.ai/#demo"
                                  }
                                />
                              )}
                            </div>
                          </div>
                          <div className="row justify-content-center">
                            <div className="col-12 col-sm-6 text-center">
                              <StreakCounter streak={streak} />
                            </div>
                          </div>
                          <div className="row justify-content-center">
                            <div className="col-12 col-sm-6 text-center">
                              <PrognosticButton />
                            </div>
                          </div>
                        </div>
                        <Fireworks />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <Footer isFooterVisible={isFooterVisible} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
