#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#define BUFFER_SIZE 64

char* validation_color(int);

int main(int argc, char* argv[]) {
  int opt;
  char *username,\
       *database,\
       cmd_cities[BUFFER_SIZE],\
       cmd_countries[BUFFER_SIZE],\
       cmd_states[BUFFER_SIZE];

  while ( (opt = getopt(argc, argv, "u:d:p:")) != -1 ) {
      switch (opt) {
        case 'u':
          username = (char*)optarg;
          break;
        case 'd':
          database = (char*)optarg;
          break;
      }
  }

  if( !(username && database) ) {
    printf("Usage: %s -u [username] -d [database]\n", argv[0]);
  } else {
    sprintf(cmd_cities, "mysql -u %s -p %s < cities.sql", username, database);
    printf("%s\n", cmd_cities);
    system(cmd_cities);
    sprintf(cmd_countries, "mysql -u %s -p %s < countries.sql", username, database);
    printf("%s\n", cmd_countries);
    system(cmd_countries);
    sprintf(cmd_states, "mysql -u %s -p %s < states.sql", username, database);
    printf("%s\n", cmd_states);
    system(cmd_states);
  }
}
