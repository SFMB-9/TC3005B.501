import numpy as np
import pandas as pd

def rMatrix():
    n = 1000
    matrix = np.array([np.random.choice([0, 1, 2, 3, 4, 5], size=500, p=[.75, .15,.04,.03,.02,.01]) for i in range(n)])
    train_indices = int(0.9 * matrix.shape[0])
    
    df = pd.DataFrame(matrix, columns=[f"car_{i}" for i in range(500)])
    df.melt(var_name="car", value_name="rating")
    print(df)
    return df, df[:train_indices], df[train_indices:]