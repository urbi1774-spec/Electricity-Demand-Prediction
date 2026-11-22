import joblib
import pandas as pd

# Load saved model
loaded_model = joblib.load(
    'best_electricity_demand_model.pkl'
)

# Predict using test data
loaded_predictions = loaded_model.predict(X_test)

print("Predictions:")
print(loaded_predictions[:20])
