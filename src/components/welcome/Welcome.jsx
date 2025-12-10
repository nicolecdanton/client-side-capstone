import "./Welcome.css"

export const Welcome = () => {
  return (
    <section className="welcome">
      <h1>🌿 Welcome to Your Garden Planner! 🌿</h1>
      <p className="welcome-intro">
        Transform your garden dreams into reality! Plan, organize, and cultivate
        your perfect outdoor space with our comprehensive garden management tool.
      </p>

      <div className="welcome-features">
        <div className="feature-card">
          <h3>
            <span className="feature-icon">📚</span>
            Plant Library
          </h3>
          <p>
            Discover a curated collection of plants with detailed information
            about care requirements, growing seasons, and companion planting.
          </p>
        </div>
      </div>

       <div className="welcome-features">
        <div className="feature-card">
          <h3>
            <span className="feature-icon">🏷️</span>
            My Stash
          </h3>
          <p>
            Track the plants you own and manage your garden inventory with ease. Coming soon- you will be able to use your stash to plan your garden!
          </p>
        </div>
      </div>

        <div className="feature-card">
          <h3>
            <span className="feature-icon">🗺️</span>
            Garden Planning- Coming Soon!
          </h3>
          <p>
            Design your garden layout, track what you've planted, and plan
            for seasonal rotations to maximize your garden's potential.
          </p>
        </div>
        </section>
      )}