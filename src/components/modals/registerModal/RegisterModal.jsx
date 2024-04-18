import { Modal } from "@mantine/core";
import styles from "./registerModal.module.css";
import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";

export const RegisterModal = ({ openRegisterModal, setOpenRegisterModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const showUserPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Modal
      opened={openRegisterModal}
      onClose={() => setOpenRegisterModal(false)}
      closeOnClickOutside
      withCloseButton={false}
      centered
    >
      <p className={styles.title}>Register to SwipTory</p>
      <IoIosCloseCircleOutline
        className={styles.closeBtn}
        onClick={() => setOpenRegisterModal(false)}
        size={30}
      />

      <form className={styles.modal}>
        <div className={styles.modal_input}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="username"
            required
            name="username"
            autoComplete="off"
            autoFocus
          />
        </div>

        <div className={styles.modal_input}>
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Password"
            required
            name="password"
            autoComplete="off"
          />
          {showPassword ? (
            <FaEye className={styles.icon} onClick={showUserPassword} />
          ) : (
            <FaEyeSlash className={styles.icon} onClick={showUserPassword} />
          )}
        </div>

        <p className={styles.error}>Error will come here.</p>

        <div className={styles.modal_btn_div}>
          <button type="submit" className={styles.modalBtn}>
            Register
          </button>
        </div>
      </form>
    </Modal>
  );
};
