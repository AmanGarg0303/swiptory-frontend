import React, { useState } from "react";
import styles from "./navbar.module.css";
import { RegisterModal } from "../modals/registerModal/RegisterModal";
import { LoginModal } from "../modals/loginModal/LoginModal";

export const Navbar = () => {
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  return (
    <div>
      <div className={styles.main_container}>
        <h1 className={styles.title}>SwipTory</h1>

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
      </div>
    </div>
  );
};
