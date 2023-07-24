package com.rest.book.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rest.book.model.Book;
import com.rest.book.service.BookService;

@RestController
@RequestMapping("/api/v_1")
@CrossOrigin(origins="http://127.0.0.1:5500")
public class BookController {
	
	@Autowired
	BookService book_service;

	@GetMapping("")
	public String test() {
		return "Hello ! This api is working fine!";
	}
	
	@PostMapping("/books")
	public ResponseEntity createBook(@RequestBody Book book) {
		
		return book_service.createBook(book);
	}
	
	@GetMapping("/books")
	public List<Book> getAllBooks(){
		return book_service.getAllBooks();
	}
	

	@GetMapping("/book/{id}")
	public Book getbook(@PathVariable int id){
		
		return book_service.getBook(id);
	}
	
	
	@DeleteMapping("/books")
	public String deleteBook(@RequestParam(name="id") int id) {

		return book_service.deleteBook(id);
		
	}
	
	@PutMapping("/book/{id}")
	public ResponseEntity updateBook(@RequestBody Book b,@PathVariable int id) {
		return book_service.updateBook(b,id);
	}
	
	
	
}
