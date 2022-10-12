package com.example.module4_exam.controller;

import com.example.module4_exam.model.City;
import com.example.module4_exam.service.City.ICityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/city")
@CrossOrigin("*")
public class CityController {

    @Autowired
    private ICityService cityService;

    @GetMapping()
    public ResponseEntity<Iterable<City>> showAllCity() {
        return new ResponseEntity<>(cityService.findAll(), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<City> createNewCity(@RequestBody City city) {
        cityService.save(city);
        return new ResponseEntity<>(city, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<City> editCity(@PathVariable Long id, @ModelAttribute City city) {
        Optional<City> optionalCity = cityService.findById(id);
        if (!optionalCity.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        city.setId(optionalCity.get().getId());
        cityService.save(city);
        return new ResponseEntity<>(city, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<City> deleteCity(@PathVariable Long id) {
        Optional<City> optionalCity = cityService.findById(id);
        if (!optionalCity.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        cityService.remove(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
