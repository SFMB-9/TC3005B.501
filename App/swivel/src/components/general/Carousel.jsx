import React from 'react'

const Carousel = (props) => {
  return (
    <div
                        id="carouselExampleIndicators"
                        className="carousel slide"
                      >
                        {props.indicators && (

                        <div className="carousel-indicators">
                          {props.images.map((image, index) => (
                            <button
                              key={index}
                              type="button"
                              data-bs-target="#carouselExampleIndicators"
                              style={{
                                backgroundColor: "000",
                                color: "black",
                                borderTop: "none",
                                position: "relative",
                                top: "45px",
                                borderBottom: "none",
                                borderRadius: "100%",
                                height: "10px",
                                width: "10px",
                                backgroundColor: "grey",
                              }}
                              data-bs-slide-to={index}
                              className={index === 0 ? "active" : ""}
                              aria-current={index === 0 ? "true" : ""}
                            ></button>
                          ))}
                        </div>
                        )}

                        <div className="carousel-inner rounded">
                          {props.images.map((image, index) => (
                            <div
                              key={index}
                              className={`carousel-item ${
                                index === 0 ? "active" : ""
                              }`}
                            >
                              <img
                                src={image}
                                className="d-block w-100"
                                alt={'imagen carousel'}
                                style={{
                                  objectFit: "cover",
                                  objectPosition: "center",
                                  overflow: "hidden",
                                  height: "40vw",
                                  maxHeight: "460px",
                                }}
                              />
                            </div>
                          ))}
                        </div>
                        <button
                          className="carousel-control-prev"
                          type="button"
                          data-bs-target="#carouselExampleIndicators"
                          data-bs-slide="prev"
                        >
                          <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                          ></span>
                          <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                          className="carousel-control-next"
                          type="button"
                          data-bs-target="#carouselExampleIndicators"
                          data-bs-slide="next"
                        >
                          <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                          ></span>
                          <span className="visually-hidden">Next</span>
                        </button>
                      </div>
  )
}

export default Carousel