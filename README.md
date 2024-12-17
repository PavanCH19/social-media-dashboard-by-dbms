+--------------------+         1         N       +--------------------+
| DonorRegistration  |-------------------------->|   BloodRequest     |
+--------------------+                            +--------------------+
| donorId (PK)       |                            | requestId (PK)     |
| donorName          |                            | requestBloodGroup  |
| donorContact       |                            | requestQuantity    |
| donorBloodGroup    |                            | requestDate        |
| donorAddress       |                            | urgencyLevel       |
| availability       |                            | bloodBankId (FK)   |
+--------------------+                            +--------------------+
              |                                                |
              |                                                |
              |                                                |   
              |                                N               |
              |------------------------------------------------|
              |                 N                              |
              v                                                v
+--------------------+                            +--------------------+
|    BloodBank       |                            |       Admin        |
+--------------------+                            +--------------------+
| bloodBankId (PK)   |                            | adminId (PK)       |
| bloodBankName      |                            | adminName          |
| bloodBankAddress   |                            | adminContact       |
| bloodBankContact   |                            +--------------------+
+--------------------+
