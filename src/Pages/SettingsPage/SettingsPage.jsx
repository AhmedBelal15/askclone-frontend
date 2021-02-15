import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import HomePageNav from "../../Components/HomePageNav/HomePageNav.Component";
import RedirectToHome from "../../helpers/redirectToHome";
import tokensRefresher from "../../helpers/tokensRefresher";
import useStore from "../../Zustand/AuthZustand";
import "./settings-page.style.css";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    name: "",
    location: "",
    email: "",
    bio: "",
    birthday: "",
    gender: "",
    imagePath: null,
  });
    //if not logged in
    RedirectToHome()
    
  const { name, location, email, bio, birthday, gender, imagePath } = settings;
  const history = useHistory();
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  const Logout = useStore((state) => state.setLogout);

  useEffect(() => {
    (async function () {
      const response = await fetch("http://localhost:4000/user/getsettings", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "access-token": `Bearer ${accessToken}`,
          "refresh-token": refreshToken,
        },
      });
      const data = await response.json();
      if (response.status === 401) {
        localStorage.clear();
        Logout();
      }
      if (response.status === 200) {
        tokensRefresher(data);


          setSettings({
            name: data.payload.user_name,
            location: data.payload.user_location,
            email: data.payload.user_email,
            bio: data.payload.user_bio,
            birthday: data.payload.user_birthday,
            gender: data.payload.user_gender,
            imagePath: data.payload.user_image,
          });

      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/user/settings", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "access-token": `Bearer ${accessToken}`,
        "refresh-token": refreshToken,
      },
      body: JSON.stringify({
        name,
        location,
        email,
        bio,
        birthday,
        gender,
        imagePath,
      }),
    });

    const data = await response.json();
    if (response.status === 200) {
      tokensRefresher(data);
      history.go(0);
    }
  };

  const handleImageUpload = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    const response = await fetch("http://localhost:4000/upload/image", {
      method: "post",
      headers: {
        "access-token": `Bearer ${accessToken}`,
        "refresh-token": refreshToken,
      },
      body: formData,
    });
    const data = await response.json();
    setSettings({ ...settings, imagePath: data.payload });
  };

  const today = new Date().toISOString().substring(0, 10);
  const minDate = new Date().getFullYear() - 100;
  return (
    <>
      <HomePageNav />
      <div className="settings-page-container">
        <form className="settings-form" onSubmit={handleSubmit}>
          <label htmlFor="name" className="settings-form-label">
            Full name
          </label>
          <input
            type="text"
            placeholder="Name"
            id="name"
            required
            value={settings.name}
            onChange={(e) => setSettings({ ...settings, name: e.target.value })}
          />

          <label htmlFor="location" className="settings-form-label">
            Location
          </label>
          <input
            type="text"
            placeholder="Location"
            id="location"
            value={settings.location}
            onChange={(e) =>
              setSettings({ ...settings, location: e.target.value })
            }
          />

          <label htmlFor="bio" className="settings-form-label">
            About me
          </label>
          <textarea
            id="bio"
            value={settings.bio}
            onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
            placeholder="Biography"
          />

          <label htmlFor="email" className="settings-form-label">
            Change your email
          </label>
          <input
            type="email"
            required
            id="email"
            value={settings.email}
            onChange={(e) =>
              setSettings({ ...settings, email: e.target.value })
            }
          />

          <label htmlFor="date" className="settings-form-label">
            Birthday
          </label>
          <input
            type="date"
            id="date"
            min={`${minDate}-01-01`}
            max={today}
            onChange={(e) =>
              setSettings({ ...settings, birthday: e.target.value })
            }
            value={settings.birthday}
          />
          <label htmlFor="gender" className="settings-form-label">
            Gender
          </label>

          <select
            id="gender"
            value={settings.gender}
            onChange={(e) =>
              setSettings({ ...settings, gender: e.target.value })
            }
          >
            <option>Male</option>
            <option>Female</option>
            <option>Better not Specify</option>
          </select>

          <div className="image-buttons-container">
            <label
              htmlFor="profile-image-input"
              className="settings-image-input"
            >
              Change profile image
            </label>
            {settings.imagePath ? (
              <button
                className="discard-button"
                onClick={() => setSettings({ ...settings, imagePath: null })}
              >
                Discard
              </button>
            ) : null}
            <input
              id="profile-image-input"
              type="file"
              onChange={handleImageUpload}
            />
          </div>
          {settings.imagePath ? (
            <img
              src={`http://localhost:4000/${settings.imagePath}`}
              alt="profile"
              className="settings-profile-image"
            />
          ) : null}

          <button type="submit" className="settings-button">
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
};

export default SettingsPage;
