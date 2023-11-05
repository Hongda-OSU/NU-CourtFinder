import React, { useState } from "react";
import Modal from "react-modal";
import "./UserProfile.less";
import PurpleBookButtomNav from "../PurpleBookButtomNav/PurpleBookButtomNav";
//import data from "../../utilities/temp.json"; 
import data2 from "./UserProfileTest.json";

const UpcomingBookings = (user) => {
  const bookings = data2.bookings;
  console.log(bookings);
  console.log(user);
  const userBookings = bookings.filter((booking) => booking.name === user);
  return userBookings;
};

const UserProfile = ({reservations}) => {
  const userName =  data2.user.displayName;
  const upcomingBookings = UpcomingBookings( userName);
  console.log(upcomingBookings);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedBooking(null);
    setModalIsOpen(false);
  };

  const handleDeleteBooking = (booking) => {
    // change to delete data from database
    data2.bookings = data2.bookings.filter(
      (currentBooking) => currentBooking.id !== booking.id
    );

    alert(`Booking ${booking.name} has been deleted.`);
    closeModal();
  };

  const handleBooking = (booking) => {
    openModal(booking);
  };

  const handleSendEmail = (booking) => {
    const subject = "Booking Details";
    const body = `Court: ${booking.courtName}%0ALocation: ${booking.location}%0ADate: ${booking.date}%0ATime: ${booking.time}`;

    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    closeModal();
  };

  const handleSendSMS = (booking) => {
    //for text message sharing alert
    const message = `Court: ${booking.courtName}%0ALocation: ${booking.location}%0ADate: ${booking.date}%0ATime: ${booking.time}`;

    window.location.href = `sms:?&body=${message}`;
    closeModal();
  };

  return (
    <div className="background-container">
    <div className="profile-container">
      <div className="user-info">
        <h2>User Profile</h2>
        <br />
        <div className="top-text">
          <strong>Name: {data2.user.name}</strong>
        </div>
        <br />
        <div className="top-text">
          <strong>Email: {data2.user.email}</strong>
        </div>
        {/* more information?? */}
      </div>
      <div className="upcoming-bookings">
        <h2>Upcoming Reservations</h2>
        {selectedBooking && (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Booking Actions"
            className="ReactModal__Content"
          >
            <h2>How would you like to proceed?</h2>
            <div>
              <button onClick={() => handleSendEmail(selectedBooking)}>
                Share via Email
              </button>
              <button onClick={() => handleSendSMS(selectedBooking)}>
                Share via SMS
              </button>
              <button onClick={() => handleDeleteBooking(selectedBooking)}>
                Delete
              </button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </Modal>
        )}
        {upcomingBookings.length > 0 ? (
          <ul>
            {upcomingBookings.map((booking) => (
              <li key={booking.id}>
                <strong>Court: {booking.courtName}</strong>
                <br />
                <strong>Location: {booking.location}</strong>
                <br />
                <strong>Date: {booking.date}</strong>
                <br />
                <strong>Time: {booking.time}</strong>
                <br />
                <div className="button-cont">
                <button className="handle-book" onClick={() => handleBooking(booking)}> Edit</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming reservations...</p>
        )}
      </div>
    </div>
    <PurpleBookButtomNav />
    </div>
  );
};

export default UserProfile;
/*{selectedBooking && selectedBooking.id === booking.id && (
                  <div>
                    {selectedBooking ? (
                      <div>
                        <button
                          onClick={() => handleSendEmail(selectedBooking)}
                        >
                          Share via Email
                        </button>
                        <button onClick={() => handleSendSMS(selectedBooking)}>
                          Share via SMS
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteBooking(selectedBooking.id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    ) : null}
                  </div>
                )}*/