# 🌾 Crop Yield Prediction System

An end-to-end machine learning application designed to predict crop yield using agricultural and environmental data. The system combines a frontend interface, backend services, crop-specific datasets, trained machine learning models, and prediction-related processing into a unified application.

The project focuses on providing a simple interface through which users can work with crop-related information and obtain data-driven yield predictions.

> **Project Status:** Active development

---

## 📌 Overview

Agricultural yield is influenced by multiple factors such as crop type, environmental conditions, soil characteristics, and other agricultural parameters.

Traditional yield estimation can be difficult because these factors interact with each other and vary across locations and crops.

This project explores the use of **machine learning and agricultural datasets** to build a crop-yield prediction system capable of processing crop-specific data and generating yield-related predictions through an application interface.

The system is organized into separate frontend, backend, data, and machine-learning components to support an end-to-end workflow.

---

## 🎯 Objectives

* Develop a machine-learning-based crop yield prediction system.
* Process crop-specific agricultural datasets.
* Support multiple crop categories.
* Provide a user-friendly frontend for interacting with the system.
* Connect the frontend with backend prediction services.
* Organize trained ML models separately from application logic.
* Maintain prediction/query logs for application-level tracking.
* Create an extensible architecture for adding additional crops and models.

---

## 🌱 Supported Crops

The current project contains crop-specific datasets for:

* 🌾 **Paddy**
* 🥜 **Groundnut**
* 🌾 **Millets**

The corresponding datasets are stored inside the `data/` directory.

```text
data/
├── groundnut_kadapa.csv
├── millets_kadapa.csv
└── paddy_kadapa.csv
```

The datasets are associated with the **Kadapa** region and are used as part of the agricultural prediction workflow.

---

## 🧠 Machine Learning Component

The project contains a dedicated `ml_models/` directory for the machine-learning models used by the application.

The general prediction workflow is:

```text
Agricultural Input Data
        │
        ▼
Data Processing
        │
        ▼
Feature Preparation
        │
        ▼
Machine Learning Model
        │
        ▼
Crop Yield Prediction
        │
        ▼
Backend Response
        │
        ▼
Frontend Display
```

The separation of the ML models from the backend and frontend allows the prediction component to be maintained independently from the user interface.

---

## 🏗️ System Architecture

```text
                         ┌─────────────────────┐
                         │       User          │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │      Frontend       │
                         │                     │
                         │ User Input / UI     │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │      Backend        │
                         │                     │
                         │ API / Application   │
                         │ Logic               │
                         └──────────┬──────────┘
                                    │
                         ┌──────────┴──────────┐
                         │                     │
                         ▼                     ▼
                ┌─────────────────┐   ┌─────────────────┐
                │   ML Models     │   │  Agricultural   │
                │                 │   │     Data        │
                └────────┬────────┘   └────────┬────────┘
                         │                     │
                         └──────────┬──────────┘
                                    ▼
                         ┌─────────────────────┐
                         │  Yield Prediction   │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ Frontend Result     │
                         └─────────────────────┘
```

---

## 🖥️ Frontend

The project contains a dedicated `frontend/` application.

The frontend is responsible for providing the user-facing interface and communicating with the backend services.

The frontend project contains:

```text
frontend/
├── public/
├── src/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
└── ...
```

The frontend is organized as a modern web application and separates UI components from the backend prediction logic.

---

## ⚙️ Backend

The backend is located inside the `backend/` directory.

```text
backend/
├── app.py
├── query_logger.py
├── query_logs.csv
└── logs/
```

### Backend responsibilities

* Handle application requests.
* Connect the frontend with the prediction functionality.
* Process prediction-related requests.
* Work with the machine-learning component.
* Maintain application/query logs.

The backend also contains a dedicated query-logging component for recording application interactions.

---

## 📊 Query Logging

The project contains:

```text
backend/query_logger.py
backend/query_logs.csv
backend/logs/
```

The query logger provides an application-level mechanism for tracking prediction-related queries.

This can be useful for:

* Monitoring application usage.
* Debugging.
* Reviewing previous requests.
* Analysing prediction interactions.
* Supporting future improvements to the system.

---

## 📁 Project Structure

```text
Crop-Yield-Prediction-System/
│
├── backend/
│   ├── __pycache__/
│   ├── logs/
│   ├── app.py
│   ├── query_logger.py
│   └── query_logs.csv
│
├── data/
│   ├── groundnut_kadapa.csv
│   ├── millets_kadapa.csv
│   └── paddy_kadapa.csv
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── .gitignore
│   ├── bun.lockb
│   ├── components.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── tailwind.config.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
│
├── ml_models/
│   └── ...
│
├── scripts/
│   └── ...
│
└── README.md
```

---

## 🛠️ Technologies

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS

### Backend

* Python
* Python-based backend application

### Machine Learning

* Machine Learning
* Agricultural data processing
* Crop-specific predictive models

### Data

* CSV datasets
* Pandas/data processing workflow

### Development Tools

* Git
* GitHub
* VS Code

> The exact ML algorithms and evaluation metrics should be documented here after the model implementation and evaluation results are finalized.

---

## 🔄 Application Workflow

The system follows an end-to-end workflow:

### 1. User Interaction

The user interacts with the frontend and provides the required agricultural information.

### 2. Request Processing

The frontend sends the required information to the backend.

### 3. Data Preparation

The backend processes the incoming information into the format required by the prediction component.

### 4. Crop Selection

The system works with crop-specific agricultural data, including:

* Paddy
* Groundnut
* Millets

### 5. Machine Learning Prediction

The appropriate model from the `ml_models/` component is used for the prediction workflow.

### 6. Result Generation

The prediction is returned to the application.

### 7. Result Display

The frontend presents the prediction to the user.

### 8. Query Logging

Relevant application interactions can be recorded through the query-logging component.

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed:

* Python 3.x
* Node.js
* npm
* Git

---

## 📥 Clone the Repository

```bash
git clone https://github.com/TYNR2006/Crop-Yield-Prediction-System.git
```

Navigate to the project:

```bash
cd Crop-Yield-Prediction-System
```

---

## ⚙️ Backend Setup

Navigate to the backend:

```bash
cd backend
```

Install the required Python dependencies according to the project's backend dependency configuration.

Then run the backend application:

```bash
python app.py
```

> If your project uses a specific backend command or virtual environment configuration, update this section with the exact command before publishing the README.

---

## 🖥️ Frontend Setup

Open another terminal and navigate to:

```bash
cd frontend
```

Install the frontend dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will then be available through the local development URL displayed by Vite.

---

## 📈 Prediction Workflow

A typical prediction flow can be represented as:

```text
User
 │
 ▼
Select / Enter Agricultural Parameters
 │
 ▼
Frontend
 │
 ▼
Backend API
 │
 ▼
Data Processing
 │
 ▼
Crop-Specific ML Model
 │
 ▼
Predicted Crop Yield
 │
 ▼
Frontend Result
```

---

## 🌾 Dataset Organization

The current project contains three crop-specific datasets:

### Paddy

```text
data/paddy_kadapa.csv
```

### Groundnut

```text
data/groundnut_kadapa.csv
```

### Millets

```text
data/millets_kadapa.csv
```

These datasets provide the agricultural information used within the crop-yield prediction workflow.

---

## 🔬 Machine Learning Development

The `ml_models/` directory is intended to keep the predictive models separate from the application code.

This separation provides several advantages:

* Easier model maintenance.
* Independent model updates.
* Cleaner backend architecture.
* Ability to add crop-specific models.
* Easier experimentation with different ML approaches.

The `scripts/` directory provides a separate location for supporting development and data/model-processing scripts.

---

## 📊 Model Evaluation

Model evaluation is an important part of the project.

The final version of the project should report the actual evaluation metrics obtained during testing, such as:

* R²
* MAE
* RMSE
* MAPE

> **Note:** No specific accuracy value is reported in this README because the exact evaluation metric and result have not been verified from the current project files.

This avoids presenting an unsupported performance claim.

---

## ✨ Key Features

* 🌾 Crop-specific yield prediction
* 🌱 Support for multiple agricultural datasets
* 🧠 Machine-learning-based prediction workflow
* 🖥️ Interactive frontend
* ⚙️ Backend prediction service
* 📊 Crop-specific data processing
* 📝 Query logging
* 🧩 Modular ML model organization
* 🔧 Extensible project architecture

---

## 🔮 Future Improvements

The system can be extended with:

### Machine Learning

* Hyperparameter optimization.
* Model comparison.
* Cross-validation.
* Improved feature engineering.
* Additional crop datasets.
* More detailed model evaluation.
* Improved prediction accuracy.
* Model explainability.

### Application

* Cloud deployment.
* User authentication.
* Prediction history.
* Interactive data visualization.
* Downloadable prediction reports.
* Mobile-friendly interface.

### Agricultural Intelligence

* Weather integration.
* Soil-condition analysis.
* Location-specific recommendations.
* Historical yield analysis.
* Crop recommendation.
* Fertilizer recommendation.
* Irrigation recommendations.

---

## ⚠️ Limitations

* Model predictions depend on the quality and coverage of the available agricultural datasets.
* Current datasets are associated with the Kadapa region.
* The supported crop categories are currently limited to the available datasets.
* Predictions should be interpreted as data-driven estimates rather than guaranteed agricultural outcomes.
* Model performance may vary for agricultural conditions outside the training-data distribution.

---

## 🧪 Development Status

### Completed / Implemented

* [x] Frontend application structure
* [x] Backend application
* [x] Agricultural datasets
* [x] Crop-specific data organization
* [x] ML model directory
* [x] Prediction workflow
* [x] Query logging
* [x] Multi-component project architecture

### Future Work

* [ ] Expand agricultural datasets
* [ ] Improve model evaluation
* [ ] Add detailed performance metrics
* [ ] Compare multiple ML algorithms
* [ ] Improve model generalization
* [ ] Add additional crops
* [ ] Deploy the application
* [ ] Add advanced agricultural recommendations

---

## 🧑‍💻 Author

**Yoganandha Reddy Thappeta**

B.Tech — Computer Science and Engineering
Artificial Intelligence & Machine Learning

### Profiles

* GitHub: https://github.com/TYNR2006
* LinkedIn: Add your LinkedIn profile here

---

## 📌 Project Summary

**Crop Yield Prediction System** is an end-to-end agricultural machine-learning application that combines:

```text
Agricultural Data
       ↓
Data Processing
       ↓
Machine Learning
       ↓
Crop Yield Prediction
       ↓
Backend Services
       ↓
Frontend Interface
       ↓
User-Facing Results
```

The project demonstrates the integration of **machine learning, backend development, frontend development, agricultural datasets, and application-level logging** into a unified software system.

---

## 📄 License

This project is intended for educational and research purposes.

Add an appropriate open-source license to this repository if you intend to make the code available for reuse.
