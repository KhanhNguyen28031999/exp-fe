import "./App.css";
import React, { useState } from "react";
import moment from "moment";
import axios from "axios";

function App() {
  const today = new Date();
  const newToday = moment(today).format("YYYY-MM-DD");

  const [checkin, setCheckin] = useState(newToday);
  const [checkout, setCheckout] = useState("");
  const [guestName, setGuestName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [room, SetRoom] = useState(1);
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);
  const [destination, setDestination] = useState("");

  const handleCheckinChange = (event) => {
    const selectedDate = event.target.value;
    const formattedDate = moment(selectedDate, "YYYY-MM-DD").format(
      "YYYY-MM-DD"
    );
    if (moment(formattedDate).isSameOrAfter(newToday)) {
      setCheckin(formattedDate);
    }
  };

  const handleCheckoutChange = (event) => {
    const selectedDate = event.target.value;
    const formattedDate = moment(selectedDate, "YYYY-MM-DD").format(
      "YYYY-MM-DD"
    );
    if (moment(formattedDate).isAfter(checkin)) {
      setCheckout(formattedDate);
    } else {
      alert("Ngày checkout cần lớn hơn ngày checkin ");
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const bookingData = {
      destination,
      guestName,
      phoneNumber,
      checkin,
      checkout,
      room,
      adult,
      children,
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/booking",
        bookingData
      );
      if (response.status === 200) {
        console.log("Booking created successfully:", response.data);
      } else {
        console.error("Error creating booking:", response.statusText);
      }
    } catch (err) {
      console.error("Error submitting booking:", err);
    }
  };

  return (
    <div className="App">
      <div className="main-app">
        <div className="main-app-ui">
          <div className="main-app-ui-input">
            <div>
              <label>Your Destination</label>
              <input
                id="destination"
                placeholder="Enter a destination or hotel name"
                required="true"
                maxLength={250}
                defaultValue={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="guest-information">
              <label>Tên khách hàng</label>
              <input
                placeholder="Họ và tên ..."
                required
                maxLength={40}
                onChange={(e) => setGuestName(e.target.value)}
              />
              <label>Số điện thoại</label>
              <input
                placeholder="Số điện thoại ..."
                required
                maxLength={11}
                minLength={10}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="check">
              <div className="checkin">
                <label>Checkin</label>
                <input
                  type="date"
                  className="check-input"
                  required
                  value={checkin}
                  onChange={handleCheckinChange}
                  min={newToday}
                />
              </div>
              <div className="checkout">
                <label>Checkout</label>
                <input
                  type="date"
                  className="check-input"
                  required
                  value={checkout}
                  onChange={handleCheckoutChange}
                  min={checkin}
                />
              </div>
            </div>
            <div className="room-adult-child">
              <div className="room">
                <label>Rooms</label>
                <input
                  type="number"
                  required="true"
                  max={100}
                  min={1}
                  defaultValue={room}
                  onChange={(e) => SetRoom(e.target.value)}
                />
              </div>
              <div className="adult">
                <label>Adults</label>
                <input
                  type="number"
                  required="true"
                  max={1000}
                  min={1}
                  defaultValue={adult}
                  onChange={(e) => setAdult(e.target.value)}
                />
              </div>
              <div className="child">
                <label>Children</label>
                <input
                  type="number"
                  required="true"
                  max={1000}
                  min={0}
                  defaultValue={children}
                  onChange={(e) => setChildren(e.target.value)}
                />
              </div>
            </div>
            <button onClick={handleBookingSubmit} className="checkbutton">
              Submit Booking
            </button>
          </div>
          <div className="main-app-ui-text">
            <div>
              <h1>MAKE YOUR RESERVATION</h1>
              <h5>
                Maecenas quis metus sed erat condimentum eleifend. Sed sit amet
                nibh id orci malesuada fermentum et posuere orci. Praesent vitae
                molestie lorem. Fusce eu venenatis augue. Suspendisse placerat
                ipsum at nibh varius, eget cursus nulla laoreet. Phasellus
                vulputate nulla ipsum. Sed maximus orci sem, sed euismod nisl
                rutrum condimentum.
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
