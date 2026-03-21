-- Create Users table
CREATE TABLE
    users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        location VARCHAR(100),
        avatar_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- Create all_goals table
CREATE TABLE goal_options (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  key VARCHAR(50) UNIQUE NOT NULL
);

-- Insert into all_goals table

INSERT INTO goal_options (name, key) VALUES
('Lose Weight', 'lose-weight'),
('Build Muscle', 'build-muscle'),
('Improve Endurance', 'improve-endurance'),
('Increase Flexibility', 'increase-flexibility'),
('Boost Strength', 'boost-strength'),
('Improve Overall Health', 'overall-health'),
('Improve Balance & Mobility', 'balance-mobility'),
('Rehabilitation & Recovery', 'rehabilitation-recovery'),
('Prepare for a Competition', 'competition');

-- Create user_goals table

CREATE TABLE user_goals (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    goal_id INT REFERENCES goal_options(id) ON DELETE CASCADE,
    UNIQUE (user_id, goal_id)
)







