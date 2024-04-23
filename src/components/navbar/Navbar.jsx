import React, { useState } from "react";
import styles from "./navbar.module.css";
import { RegisterModal } from "../modals/registerModal/RegisterModal";
import { LoginModal } from "../modals/loginModal/LoginModal";
import { FaBookmark } from "react-icons/fa";
import { IoMenuSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import AddStory from "../modals/addStoryModal/AddStoryModal";
import { useSelector, useDispatch } from "react-redux";
import newRequest from "../../utils/newRequest";
import toast from "react-hot-toast";
import { logout } from "../../redux/userSlice";

export const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openHamburgerMenu, setOpenHamburgerMenu] = useState(false);
  const [openCreateStoryModal, setOpenCreateStoryModal] = useState(false);

  const handleLogout = async () => {
    try {
      await newRequest.get(`/auth/logout`);
      dispatch(logout());
      toast.success("Logged out successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <div className={styles.main_container}>
        <Link to={"/"} className={styles.link}>
          <h1 className={styles.title}>SwipTory</h1>
        </Link>
        {!currentUser ? (
          <div className={styles.btns}>
            <button
              onClick={() => setOpenRegisterModal(true)}
              className={styles.register}
            >
              Register Now
            </button>
            <RegisterModal
              openRegisterModal={openRegisterModal}
              setOpenRegisterModal={setOpenRegisterModal}
            />

            <button
              onClick={() => setOpenLoginModal(true)}
              className={styles.login}
            >
              Sign In
            </button>
            <LoginModal
              openLoginModal={openLoginModal}
              setOpenLoginModal={setOpenLoginModal}
            />
          </div>
        ) : (
          <div className={styles.availabeUserBtns}>
            <div className={styles.btns}>
              <Link to={"/bookmarks"} className={styles.link}>
                <button className={styles.bookmarks}>
                  <FaBookmark fill="white" />
                  Bookmarks
                </button>
              </Link>

              <button
                onClick={() => setOpenCreateStoryModal(true)}
                className={styles.addStory}
              >
                Add Story
              </button>
              <AddStory
                openCreateStoryModal={openCreateStoryModal}
                setOpenCreateStoryModal={setOpenCreateStoryModal}
              />
            </div>

            <img
              src="https://avatars.githubusercontent.com/u/99589204?v=4"
              alt=""
              className={styles.userImg}
            />

            <IoMenuSharp
              size={30}
              className={styles.menuIcon}
              onClick={() => setOpenHamburgerMenu(!openHamburgerMenu)}
            />
            {openHamburgerMenu && (
              <div className={styles.menuArea}>
                <h6 className={styles.yourName}>{currentUser.username}</h6>

                <button className={styles.logout} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
