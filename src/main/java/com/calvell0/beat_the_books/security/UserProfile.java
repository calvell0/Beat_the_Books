package com.calvell0.beat_the_books.security;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
class UserProfile {

    @Id
    String sub;
}

