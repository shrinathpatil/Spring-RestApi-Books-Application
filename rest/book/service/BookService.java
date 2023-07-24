package com.rest.book.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.rest.book.model.Book;
import com.rest.book.repo.BookDAO;

@Service
public class BookService {

	@Autowired
	BookDAO book_dao;
	
	public ResponseEntity createBook(Book book) {
		Book b=(Book) book_dao.save(book);
		if(b!=null) {
			return new ResponseEntity(b,HttpStatus.CREATED);
		}
		else {
			return new ResponseEntity("Unable to add Book",HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	public List<Book> getAllBooks(){
		return book_dao.findAll();
	}

	public String deleteBook(int id) {
		book_dao.deleteById(id);
		return "Book deleted successfully !";
	}

	public Book getBook(int id) {
		// TODO Auto-generated method stub
		return book_dao.findById(id).get();
	}

	public ResponseEntity updateBook(Book b, int id) {
		Book book=book_dao.findById(id).get();
		if(book==null) {
			return new ResponseEntity("Cannot find Book !",HttpStatus.NOT_FOUND);
		}
	Book updated=	book_dao.save(b);
		return new ResponseEntity(updated,HttpStatus.CREATED);
	}
	

}
