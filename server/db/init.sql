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
        onboarding_completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- Create all_goals table
CREATE TABLE
    goal_options (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        key VARCHAR(50) UNIQUE NOT NULL
    );

-- Insert into all_goals table
INSERT INTO
    goal_options (name, key)
VALUES
    ('Lose Weight', 'lose-weight'),
    ('Build Muscle', 'build-muscle'),
    ('Improve Endurance', 'improve-endurance'),
    ('Increase Flexibility', 'increase-flexibility'),
    ('Boost Strength', 'boost-strength'),
    ('Improve Overall Health', 'overall-health'),
    ('Improve Balance & Mobility', 'balance-mobility'),
    (
        'Rehabilitation & Recovery',
        'rehabilitation-recovery'
    ),
    ('Prepare for a Competition', 'competition');

-- Create user_goals table
CREATE TABLE
    user_goals (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users (id) ON DELETE CASCADE,
        goal_id INT REFERENCES goal_options (id) ON DELETE CASCADE,
        UNIQUE (user_id, goal_id)
    )
    --CREATE weight_logs table
CREATE TABLE
    weight_logs (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        weight NUMERIC(5, 2) NOT NULL,
        unit VARCHAR(10) NOT NULL,
        logged_at DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- CREATE water_logs table
CREATE TABLE
    water_logs (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        amount INTEGER NOT NULL,
        logged_at DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

---CREATE workout_logs table
CREATE TABLE
    workout_logs (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        note TEXT,
        logged_at DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- CREATE workout_exercises table
CREATE TABLE
    workout_exercises (
        id SERIAL PRIMARY KEY,
        workout_log_id INTEGER NOT NULL REFERENCES workout_logs (id) ON DELETE CASCADE,
        workout_name VARCHAR(100) NOT NULL,
        order_index INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (workout_id, order_index)
    );

CREATE TABLE
    workout_sets (
        id SERIAL PRIMARY KEY,
        exercise_id INTEGER NOT NULL REFERENCES workout_exercises (id) ON DELETE CASCADE,
        set_order INTEGER NOT NULL,
        weight INTEGER,
        reps INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (exercise_id, set_order)
    );