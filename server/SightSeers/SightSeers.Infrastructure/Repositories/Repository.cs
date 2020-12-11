using SightSeers.Core.Interfaces;
using SightSeers.Core.Models;
using SightSeers.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SightSeers.Infrastructure.Repositories
{
    public class Repository<T> : IRepository<T> where T : BaseEntity
    {
        private readonly SightSeersContext _dbContext;
        private readonly DbSet<T> _dbSet;
        public Repository(SightSeersContext dbContext)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException("dbContext can not be null.");
            _dbSet = dbContext.Set<T>();
        }
        public async Task<List<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }
        public async Task<List<T>> GetAllAsync(Expression<Func<T, bool>> predicate)
        {
            return await _dbSet.Where(predicate).ToListAsync();
        }
        public async Task<T> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }
        public async Task<T> GetAsync(Expression<Func<T, bool>> predicate)
        {
            return await _dbSet.Where(predicate).FirstOrDefaultAsync();
        }
        public T Get(Expression<Func<T, bool>> predicate)
        {
            return _dbSet.Where(predicate).FirstOrDefault();
        }
        public void Add(T entity)
        {
            _dbSet.Add(entity);
        }

        public void Update(T entity)
        {
            _dbContext.Set<T>().Attach(entity);
            _dbContext.Entry(entity).State = EntityState.Modified;
        }
        public void Delete(T entity)
        {
            if (entity.GetType().GetProperty("IsDeleted") != null)
            {
                T _entity = entity;

                _entity.GetType().GetProperty("IsDeleted").SetValue(_entity, true);

                this.Update(_entity);
            }
            else
            {
                var dbEntityEntry = _dbContext.Entry(entity);

                if (dbEntityEntry.State != EntityState.Deleted)
                {
                    dbEntityEntry.State = EntityState.Deleted;
                }
                else
                {
                    _dbSet.Attach(entity);
                    _dbSet.Remove(entity);
                }
            }
        }
        public async Task Delete(int id)
        {
            var entity = GetByIdAsync(id);
            if (entity == null) return;
            else
            {
                if (entity.GetType().GetProperty("IsDeleted") != null)
                {
                    T _entity = await entity;
                    _entity.GetType().GetProperty("IsDeleted").SetValue(_entity, true);

                    this.Update(_entity);
                }
                else
                {
                    Delete(await entity);
                }
            }
        }
    }
}
