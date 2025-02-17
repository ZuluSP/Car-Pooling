# Car Pooling Service - Cabify Backend Challenge

This project is a backend service designed to efficiently manage car pooling by assigning available cars to passenger groups while ensuring FIFO order for waiting groups and optimal resource utilization.

## 📌 Features
✅ REST API built with Node.js + TypeScript + Express  
✅ FIFO queue for waiting groups  
✅ Optimized data structures (`Map<>` for fast lookup)  
✅ Scalable for `10^4 - 10^5` cars and groups  
✅ Fully tested with Jest (unit, integration & performance tests)  
✅ Dockerized for easy deployment  

---

## 🚀 Getting Started

### **1️⃣ Installation**
```bash
git clone <REPO_URL>
cd car-pooling-challenge
npm install
```

### **2️⃣ Compile TypeScript**
```bash
npm run build
```

### **3️⃣ Run the Server**
```bash
npm run start
```
✅ The server will run on **http://localhost:9091**  

### **4️⃣ Check API Health**
```bash
curl http://localhost:9091/status
```
Expected response:
```json
"Service is running"
```

---

## 🧪 Running Tests

### **Run all tests**
```bash
npm test
```

### **Run performance tests**
```bash
npm test -- performance.test.ts
```
📌 Performance test ensures the service can handle `100,000+` cars & groups efficiently.  

---

## 🐳 Running with Docker

### **1️⃣ Build the Docker image**
```bash
docker build -t carpooling-service .
```

### **2️⃣ Run the container**
```bash
docker run -p 9091:9091 carpooling-service
```

### **3️⃣ Verify the API is running**
```bash
curl http://localhost:9091/status
```
✅ If successful, it should return `"Service is running"`  

---

## 🔗 API Endpoints

### **1️⃣ Health Check**
**`GET /status`**  
✅ Returns `200 OK` if the service is running  

---

### **2️⃣ Register Available Cars**
**`PUT /cars`**  
✅ Loads a list of available cars and resets previous data  

📌 **Request Body Example**
```json
[
  { "id": 1, "seats": 4 },
  { "id": 2, "seats": 6 }
]
```

📌 **Responses**
- ✅ `200 OK` → Cars successfully registered  
- ❌ `400 Bad Request` → Invalid format  

---

### **3️⃣ Request a Journey**
**`POST /journey`**  
✅ Assigns a group to a car or adds it to the waiting list if no car is available.  

📌 **Request Body Example**
```json
{ "id": 1, "people": 4 }
```

📌 **Responses**
- ✅ `200 OK` → Group assigned to a car  
- ✅ `202 Accepted` → No car available, group added to the waiting list  
- ❌ `400 Bad Request` → Invalid format  

---

### **4️⃣ Drop Off a Group**
**`POST /dropoff`**  
✅ Removes a group from the system and frees up car seats  

📌 **Request Body Example**
```bash
ID=1
```

📌 **Responses**
- ✅ `200 OK` → Group removed  
- ❌ `404 Not Found` → Group does not exist  

---

### **5️⃣ Locate a Group**
**`POST /locate`**  
✅ Finds which car a group is assigned to, or if they are still waiting  

📌 **Request Body Example**
```bash
ID=1
```

📌 **Responses**
- ✅ `200 OK` → Returns assigned car details  
```json
{ "id": 1, "seats": 4 }
```
- ✅ `204 No Content` → Group is still waiting  
- ❌ `404 Not Found` → Group does not exist  

---

## 🛠️ Technical Decisions

### **1️⃣ Optimized Data Structures**
✅ `Map<number, Car>` instead of `Array<Car>` → Fast lookups in `O(1)`.  
✅ `Map<number, Group>` instead of `Array<Group>` → Optimized FIFO queue for waiting groups.  

### **2️⃣ Performance Optimization**
✅ Stress-tested with `100,000+` cars & groups in `performance.test.ts`.  
✅ Processing remains under `40s`, ensuring scalability.  

### **3️⃣ Docker Compatibility**
✅ Port set to `9091` for compatibility with Cabify's requirements.  
✅ Respects original `Dockerfile` structure while adapting for Node.js.  

---

## ✅ Final Notes
🚀 Project fully functional and ready for production-level deployment.  
📌 Scalable, optimized, fully tested, and Docker-ready.  

---

## 👤 Author
Carlos Zulueta