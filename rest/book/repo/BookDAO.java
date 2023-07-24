package com.rest.book.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rest.book.model.Book;

@Repository
public interface BookDAO extends JpaRepository<Book,Integer>{

}
