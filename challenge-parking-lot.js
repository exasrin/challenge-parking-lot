class Car {
    constructor(nopol, pemilik) {
      this.nopol = nopol;
      this.pemilik = pemilik;
    }
  }
  
  class ParkingLot {
    constructor(capacity) {
      this.capacity = capacity;
      this.remaining = capacity;
      this.parkedCars = [];
    }
  
    park(car) {
      if (this.remaining === 0) {
        return `Mohon maaf, tempat parkir sudah penuh.`;
      }
  
      if (this.isCarParked(car.nopol)) {
        return `Mobil ${car.pemilik} dengan Nopol ${car.nopol} sudah parkir sebelumnya.`;
      }
  
      this.parkedCars.push(car);
      this.remaining--;
      return `Mobil ${car.pemilik} dengan Nopol ${car.nopol} berhasil parkir.`;
    }
  
    leave(nopol) {
      const index = this.parkedCars.findIndex((car) => car.nopol === nopol);
  
      if (index === -1) {
        return `Mobil dengan Nopol ${nopol} tidak ada.`;
      }
  
      const leftCar = this.parkedCars.splice(index, 1)[0];
      this.remaining++;
      return `Mobil ${leftCar.pemilik} dengan Nopol ${leftCar.nopol} sudah keluar.`;
    }
  
    check() {
      return {
        capacity: this.capacity,
        remaining: this.remaining,
        parkedCars: this.parkedCars.map((car) => ({
          pemilik: car.pemilik,
          nopol: car.nopol,
        })),
      };
    }
  
    isCarParked(nopol) {
      return this.parkedCars.some((car) => car.nopol === nopol);
    }
  }
  
  function createPark(capacity) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const parkingLot = new ParkingLot(capacity);
        resolve(parkingLot);
      }, 5000);
    });
  }
  
  function park(parkingLot, car) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(parkingLot.park(car));
      }, 3000);
    });
  }
  
  function leave(parkingLot, nopol) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(parkingLot.leave(nopol));
      }, 1500);
    });
  }
  
  function check(parkingLot) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(parkingLot.check());
      }, 500);
    });
  }
  
  async function main() {
    let parkingLot = await createPark(3);
  
    console.log(await park(parkingLot, new Car("BE001", "Alex")));
    console.log(await check(parkingLot));
  
    console.log(await park(parkingLot, new Car("B2021", "Blex")));
    console.log(await leave(parkingLot, "B2021"));
  
    console.log(await park(parkingLot, new Car("C012", "Clex")));
    console.log(await park(parkingLot, new Car("D0101", "Dlex")));
  
    console.log(await leave(parkingLot, "B2019"));
    console.log(await park(parkingLot, new Car("BE001", "Alex")));
    console.log(await leave(parkingLot, "B2021"));
  
    console.log(await check(parkingLot));
  
    console.log(await leave(parkingLot, "BE001"));
    console.log(await check(parkingLot));
  }
  
  main();
  